import { supabase } from './supabase';
import { PersonaType } from '@/types';

export interface UserProfile {
  id: string;
  email: string;
  persona_type: PersonaType;
  payment_status: 'free' | 'paid';
  usage_count: number;
  created_at: string;
}

export async function createUserProfile(
  userId: string,
  email: string,
  personaType: PersonaType
): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        persona_type: personaType,
        payment_status: 'free',
        usage_count: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return null;
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function updateUserUsage(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .update({ usage_count: supabase.raw('usage_count + 1') })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user usage:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating user usage:', error);
    return false;
  }
}

export async function updatePaymentStatus(userId: string, status: 'free' | 'paid'): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .update({ payment_status: status })
      .eq('id', userId);

    if (error) {
      console.error('Error updating payment status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating payment status:', error);
    return false;
  }
}

export async function saveHashtagGeneration(
  userId: string,
  contentDescription: string,
  generatedHashtags: string[],
  personaType: PersonaType
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('hashtag_generations')
      .insert({
        user_id: userId,
        content_description: contentDescription,
        generated_hashtags: generatedHashtags,
        persona_type: personaType,
      });

    if (error) {
      console.error('Error saving hashtag generation:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving hashtag generation:', error);
    return false;
  }
}

export async function getTrendingHashtags(personaType: PersonaType): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('trending_hashtags')
      .select('hashtag')
      .eq('persona_type', personaType)
      .order('trend_score', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching trending hashtags:', error);
      return [];
    }

    return data.map(item => item.hashtag);
  } catch (error) {
    console.error('Error fetching trending hashtags:', error);
    return [];
  }
}
