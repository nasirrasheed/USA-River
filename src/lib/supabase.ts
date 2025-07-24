import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'customer' | 'admin' | 'staff'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: 'customer' | 'admin' | 'staff'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: 'customer' | 'admin' | 'staff'
          created_at?: string
          updated_at?: string
        }
      }
      tours: {
        Row: {
          id: string
          title: string
          description: string
          short_description: string
          duration_minutes: number
          max_participants: number
          price: number
          image_url: string
          gallery_images: string[]
          features: string[]
          difficulty_level: 'beginner' | 'intermediate' | 'advanced'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          short_description: string
          duration_minutes: number
          max_participants: number
          price: number
          image_url: string
          gallery_images?: string[]
          features?: string[]
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          short_description?: string
          duration_minutes?: number
          max_participants?: number
          price?: number
          image_url?: string
          gallery_images?: string[]
          features?: string[]
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          tour_id: string
          customer_id: string
          customer_email: string
          customer_name: string
          customer_phone: string
          booking_date: string
          booking_time: string
          participants: number
          total_amount: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status: 'pending' | 'paid' | 'refunded'
          stripe_payment_intent_id: string | null
          special_requests: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tour_id: string
          customer_id?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          booking_date: string
          booking_time: string
          participants: number
          total_amount: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status?: 'pending' | 'paid' | 'refunded'
          stripe_payment_intent_id?: string | null
          special_requests?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tour_id?: string
          customer_id?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          booking_date?: string
          booking_time?: string
          participants?: number
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status?: 'pending' | 'paid' | 'refunded'
          stripe_payment_intent_id?: string | null
          special_requests?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      availability: {
        Row: {
          id: string
          tour_id: string
          date: string
          time_slots: string[]
          max_bookings_per_slot: number
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tour_id: string
          date: string
          time_slots: string[]
          max_bookings_per_slot: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tour_id?: string
          date?: string
          time_slots?: string[]
          max_bookings_per_slot?: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}