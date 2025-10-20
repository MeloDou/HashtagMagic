-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  persona_type TEXT CHECK (persona_type IN ('luxury', 'business', 'creator')) NOT NULL,
  payment_status TEXT CHECK (payment_status IN ('free', 'paid')) DEFAULT 'free',
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hashtag_generations table
CREATE TABLE IF NOT EXISTS public.hashtag_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content_description TEXT NOT NULL,
  generated_hashtags TEXT[] NOT NULL,
  persona_type TEXT CHECK (persona_type IN ('luxury', 'business', 'creator')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trending_hashtags table
CREATE TABLE IF NOT EXISTS public.trending_hashtags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hashtag TEXT NOT NULL,
  category TEXT NOT NULL,
  persona_type TEXT CHECK (persona_type IN ('luxury', 'business', 'creator')) NOT NULL,
  trend_score INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hashtag_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trending_hashtags ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for hashtag_generations table
CREATE POLICY "Users can view own generations" ON public.hashtag_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations" ON public.hashtag_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for trending_hashtags table (public read access)
CREATE POLICY "Anyone can view trending hashtags" ON public.trending_hashtags
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_persona_type ON public.users(persona_type);
CREATE INDEX IF NOT EXISTS idx_hashtag_generations_user_id ON public.hashtag_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_hashtag_generations_persona_type ON public.hashtag_generations(persona_type);
CREATE INDEX IF NOT EXISTS idx_trending_hashtags_persona_type ON public.trending_hashtags(persona_type);
CREATE INDEX IF NOT EXISTS idx_trending_hashtags_trend_score ON public.trending_hashtags(trend_score DESC);

-- Insert some sample trending hashtags
INSERT INTO public.trending_hashtags (hashtag, category, persona_type, trend_score) VALUES
-- Luxury Influencer hashtags
('#luxurylifestyle', 'lifestyle', 'luxury', 95),
('#highfashion', 'fashion', 'luxury', 92),
('#designer', 'fashion', 'luxury', 88),
('#premium', 'brand', 'luxury', 85),
('#exclusive', 'lifestyle', 'luxury', 90),
('#luxurytravel', 'travel', 'luxury', 87),
('#couture', 'fashion', 'luxury', 89),
('#sophisticated', 'lifestyle', 'luxury', 83),

-- Business Owner hashtags
('#entrepreneur', 'business', 'business', 94),
('#businessgrowth', 'business', 'business', 91),
('#networking', 'business', 'business', 88),
('#leadership', 'business', 'business', 89),
('#startup', 'business', 'business', 86),
('#b2b', 'marketing', 'business', 84),
('#professional', 'career', 'business', 87),
('#success', 'motivation', 'business', 92),

-- Content Creator hashtags
('#contentcreator', 'creator', 'creator', 93),
('#viral', 'social', 'creator', 90),
('#creative', 'art', 'creator', 88),
('#community', 'social', 'creator', 85),
('#engagement', 'social', 'creator', 87),
('#trending', 'social', 'creator', 89),
('#socialmedia', 'platform', 'creator', 91),
('#creator', 'identity', 'creator', 86)
ON CONFLICT DO NOTHING;
