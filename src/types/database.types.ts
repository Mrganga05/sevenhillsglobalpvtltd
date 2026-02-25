export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          short_description: string | null
          full_description: string | null
          image_url: string | null
          gallery_images: string[] | null
          packaging_details: string | null
          moq: string | null
          origin: string | null
          certifications: string[] | null
          category_id: string | null
          price: number | null
          is_featured: boolean | null
          created_at: string
          categories?: { id: string; name: string; slug: string; description: string | null; created_at: string }
          subproducts?: { id: string; product_id: string; name: string; slug: string; short_description: string | null; image_url: string | null; price: number | null; created_at: string }[]
        }
        Insert: {
          id?: string
          name: string
          slug: string
          short_description?: string | null
          full_description?: string | null
          image_url?: string | null
          gallery_images?: string[] | null
          packaging_details?: string | null
          moq?: string | null
          origin?: string | null
          certifications?: string[] | null
          category_id?: string | null
          price?: number | null
          is_featured?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          short_description?: string | null
          full_description?: string | null
          image_url?: string | null
          gallery_images?: string[] | null
          packaging_details?: string | null
          moq?: string | null
          origin?: string | null
          certifications?: string[] | null
          category_id?: string | null
          price?: number | null
          is_featured?: boolean | null
          created_at?: string
        }
      }
      subproducts: {
        Row: {
          id: string
          product_id: string
          name: string
          slug: string
          short_description: string | null
          image_url: string | null
          price: number | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          slug: string
          short_description?: string | null
          image_url?: string | null
          price?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          slug?: string
          short_description?: string | null
          image_url?: string | null
          price?: number | null
          created_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          name: string | null
          email: string | null
          phone: string | null
          product_id: string | null
          message: string | null
          status: 'new' | 'contacted' | 'closed' | null
          created_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          product_id?: string | null
          message?: string | null
          status?: 'new' | 'contacted' | 'closed' | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          product_id?: string | null
          message?: string | null
          status?: 'new' | 'contacted' | 'closed' | null
          created_at?: string
        }
      }
      stats: {
        Row: {
          id: string
          countries_served: number | null
          export_volume: string | null
          happy_clients: number | null
          product_categories: number | null
        }
        Insert: {
          id?: string
          countries_served?: number | null
          export_volume?: string | null
          happy_clients?: number | null
          product_categories?: number | null
        }
        Update: {
          id?: string
          countries_served?: number | null
          export_volume?: string | null
          happy_clients?: number | null
          product_categories?: number | null
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string | null
          country: string | null
          message: string | null
          rating: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          country?: string | null
          message?: string | null
          rating?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          country?: string | null
          message?: string | null
          rating?: number | null
          created_at?: string
        }
      }
      certifications: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'editor' | 'viewer' | null
        }
        Insert: {
          id: string
          role?: 'admin' | 'editor' | 'viewer' | null
        }
        Update: {
          id?: string
          role?: 'admin' | 'editor' | 'viewer' | null
        }
      }
    }
  }
}
