/*
  # Create initial database schema for AquaThrill NYC

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text, nullable)
      - `phone` (text, nullable)
      - `role` (enum: customer, admin, staff)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tours`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `short_description` (text)
      - `duration_minutes` (integer)
      - `max_participants` (integer)
      - `price` (integer, in cents)
      - `image_url` (text)
      - `gallery_images` (text array)
      - `features` (text array)
      - `difficulty_level` (enum: beginner, intermediate, advanced)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `tour_id` (uuid, foreign key)
      - `customer_id` (uuid, foreign key, nullable)
      - `customer_email` (text)
      - `customer_name` (text)
      - `customer_phone` (text)
      - `booking_date` (date)
      - `booking_time` (time)
      - `participants` (integer)
      - `total_amount` (integer, in cents)
      - `status` (enum: pending, confirmed, cancelled, completed)
      - `payment_status` (enum: pending, paid, refunded)
      - `stripe_payment_intent_id` (text, nullable)
      - `special_requests` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `availability`
      - `id` (uuid, primary key)
      - `tour_id` (uuid, foreign key)
      - `date` (date)
      - `time_slots` (text array)
      - `max_bookings_per_slot` (integer)
      - `is_available` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for admin users to manage all data
    - Add policies for public access to tours and availability

  3. Functions
    - Updated timestamp trigger function
    - Automatic profile creation on user signup
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'staff');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text UNIQUE NOT NULL,
    full_name text,
    phone text,
    role user_role DEFAULT 'customer',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    short_description text NOT NULL,
    duration_minutes integer NOT NULL DEFAULT 60,
    max_participants integer NOT NULL DEFAULT 6,
    price integer NOT NULL DEFAULT 0,
    image_url text NOT NULL,
    gallery_images text[] DEFAULT '{}',
    features text[] DEFAULT '{}',
    difficulty_level difficulty_level DEFAULT 'beginner',
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id uuid NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
    customer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_email text NOT NULL,
    customer_name text NOT NULL,
    customer_phone text NOT NULL,
    booking_date date NOT NULL,
    booking_time time NOT NULL,
    participants integer NOT NULL DEFAULT 1,
    total_amount integer NOT NULL DEFAULT 0,
    status booking_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    stripe_payment_intent_id text,
    special_requests text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create availability table
CREATE TABLE IF NOT EXISTS availability (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id uuid NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
    date date NOT NULL,
    time_slots text[] NOT NULL DEFAULT '{}',
    max_bookings_per_slot integer NOT NULL DEFAULT 1,
    is_available boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(tour_id, date)
);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON tours 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_availability_updated_at BEFORE UPDATE ON availability 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can read own profile"
    ON profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
    ON profiles FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles"
    ON profiles FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create RLS policies for tours
CREATE POLICY "Anyone can read active tours"
    ON tours FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "Admins can manage tours"
    ON tours FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- Create RLS policies for bookings
CREATE POLICY "Users can read own bookings"
    ON bookings FOR SELECT
    TO authenticated
    USING (customer_id = auth.uid());

CREATE POLICY "Users can create bookings"
    ON bookings FOR INSERT
    TO authenticated, anon
    WITH CHECK (true);

CREATE POLICY "Users can update own bookings"
    ON bookings FOR UPDATE
    TO authenticated
    USING (customer_id = auth.uid());

CREATE POLICY "Admins can manage all bookings"
    ON bookings FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- Create RLS policies for availability
CREATE POLICY "Anyone can read availability"
    ON availability FOR SELECT
    TO anon, authenticated
    USING (is_available = true);

CREATE POLICY "Admins can manage availability"
    ON availability FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('admin', 'staff')
        )
    );

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
    RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample tours
INSERT INTO tours (id, title, description, short_description, duration_minutes, max_participants, price, image_url, gallery_images, features, difficulty_level) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'NYC Skyline Adventure',
    'Experience the Manhattan skyline like never before with our signature tour featuring the Statue of Liberty and Brooklyn Bridge views. This comprehensive tour takes you through the most iconic waterways of New York City, offering unparalleled photo opportunities and breathtaking vistas that showcase the city''s architectural marvels from a unique perspective.',
    'Iconic skyline views and landmark sightseeing',
    90,
    8,
    15000,
    'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    ARRAY[
        'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    ARRAY['Statue of Liberty Views', 'Brooklyn Bridge', 'Professional Guide', 'Safety Equipment', 'Photo Package'],
    'beginner'
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'Sunset Romance Tour',
    'Glide through golden waters as the sun sets behind the Manhattan skyline. Perfect for couples and special occasions, this intimate tour includes champagne service and professional photography to capture your magical moments on the water.',
    'Romantic sunset ride with champagne service',
    120,
    6,
    22500,
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    ARRAY[
        'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    ARRAY['Champagne Service', 'Sunset Views', 'Private Guide', 'Photography Package', 'Romantic Setup'],
    'intermediate'
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'Adrenaline Rush Experience',
    'For thrill-seekers only! High-speed adventure through open waters with advanced maneuvers and jumps. Our expert instructors will guide you through exciting techniques while ensuring maximum safety and fun.',
    'High-speed thrills for experienced riders',
    75,
    4,
    20000,
    'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    ARRAY[
        'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    ARRAY['High-Speed Racing', 'Advanced Maneuvers', 'Expert Instruction', 'GoPro Footage', 'Action Photography'],
    'advanced'
);

-- Insert sample availability for the next 30 days
INSERT INTO availability (tour_id, date, time_slots, max_bookings_per_slot)
SELECT 
    t.id,
    CURRENT_DATE + INTERVAL '1 day' * generate_series(1, 30),
    ARRAY['09:00', '11:30', '14:00', '16:30'],
    2
FROM tours t
WHERE t.is_active = true;