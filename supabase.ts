import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          persona_type: 'luxury' | 'business' | 'creator';
          payment_status: 'free' | 'paid';
          usage_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          persona_type: 'luxury' | 'business' | 'creator';
          payment_status?: 'free' | 'paid';
          usage_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          persona_type?: 'luxury' | 'business' | 'creator';
          payment_status?: 'free' | 'paid';
          usage_count?: number;
          created_at?: string;
        };
      };
      hashtag_generations: {
        Row: {
          id: string;
          user_id: string;
          content_description: string;
          generated_hashtags: string[];
          persona_type: 'luxury' | 'business' | 'creator';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content_description: string;
          generated_hashtags: string[];
          persona_type: 'luxury' | 'business' | 'creator';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content_description?: string;
          generated_hashtags?: string[];
          persona_type?: 'luxury' | 'business' | 'creator';
          created_at?: string;
        };
      };
      trending_hashtags: {
        Row: {
          id: string;
          hashtag: string;
          category: string;
          persona_type: 'luxury' | 'business' | 'creator';
          trend_score: number;
          last_updated: string;
        };
        Insert: {
          id?: string;
          hashtag: string;
          category: string;
          persona_type: 'luxury' | 'business' | 'creator';
          trend_score: number;
          last_updated?: string;
        };
        Update: {
          id?: string;
          hashtag?: string;
          category?: string;
          persona_type?: 'luxury' | 'business' | 'creator';
          trend_score?: number;
          last_updated?: string;
        };
      };
    };
  };
}
