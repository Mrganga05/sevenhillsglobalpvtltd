import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database.types';

type Product = Database['public']['Tables']['products']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Stat = Database['public']['Tables']['stats']['Row'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];

// --- Products Hooks ---

export const useProducts = (categorySlug?: string, featuredOnly?: boolean, limit?: number) => {
    return useQuery({
        queryKey: ['products', { categorySlug, featuredOnly, limit }],
        queryFn: async () => {
            let query = supabase.from('products').select('*, categories(*)').order('created_at', { ascending: false });

            if (categorySlug) query = query.eq('categories.slug', categorySlug);
            if (featuredOnly) query = query.eq('is_featured', true);
            if (limit) query = query.limit(limit);

            const { data, error } = await query;
            if (error) {
                console.error("Supabase Error (products):", error.message || error);
                return [] as Product[];
            }
            return data as Product[];
        },
    });
};

export const useProductBySlug = (slug: string) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*, categories(*)')
                .eq('slug', slug)
                .maybeSingle();

            if (error) {
                console.error("Supabase Error (product):", error.message || error);
                return null as unknown as Product; // Let UI handle null
            }
            return data as Product;
        },
        enabled: !!slug,
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data, error } = await supabase.from('categories').select('*').order('name');
            if (error) {
                console.error("Supabase Error (categories):", error.message || error);
                return [] as Category[];
            }
            return data as Category[];
        },
    });
};

export const useSubproducts = (productId?: string) => {
    return useQuery({
        queryKey: ['subproducts', productId],
        queryFn: async () => {
            if (!productId) return [];
            const { data, error } = await supabase.from('subproducts').select('*').eq('product_id', productId).order('created_at', { ascending: false });
            if (error) {
                console.error("Supabase Error (subproducts):", error.message || error);
                return [];
            }
            return data as any[];
        },
        enabled: !!productId,
    });
};

// --- Stats Hooks ---

export const useStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const { data, error } = await supabase.from('stats').select('*').limit(1).maybeSingle();
            if (error) {
                console.error("Supabase Error (stats):", error.message || error);
                // Return default fallback on error
                return {
                    countries_served: 0,
                    export_volume: '0',
                    happy_clients: 0,
                    product_categories: 0
                } as Stat;
            }
            return (data as Stat) || {
                countries_served: 0,
                export_volume: '0',
                happy_clients: 0,
                product_categories: 0
            };
        },
    });
};

// --- Testimonials Hooks ---

export const useTestimonials = (limit?: number) => {
    return useQuery({
        queryKey: ['testimonials', { limit }],
        queryFn: async () => {
            let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false });
            if (limit) query = query.limit(limit);

            const { data, error } = await query;
            if (error) {
                console.error("Supabase Error (testimonials):", error.message || error);
                return [] as Testimonial[];
            }
            return data as Testimonial[];
        },
    });
};

// --- Inquiries Hooks ---

export const useSubmitInquiry = () => {
    return useMutation({
        mutationFn: async (inquiryData: Database['public']['Tables']['inquiries']['Insert']) => {
            const { data, error } = await supabase.from('inquiries').insert(inquiryData as any).select();
            if (error) throw error;
            return data;
        },
    });
};

