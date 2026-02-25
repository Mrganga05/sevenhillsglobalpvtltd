import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
    "Turmeric",
    "Cashew nuts",
    "Onions / onion powder",
    "Millets",
    "Jaggery/jaggery powder",
    "Honey",
    "Moringa powder",
    "Banana powder",
    "Groundnut",
    "Black pepper",
    "Dry red chilli /dry red chilli powder",
    "Spices",
    "Herbal powders",
    "Vegetable powders",
    "Vegetables",
    "Fruits( mangoes)",
    "Tea",
    "Coffee",
    "Marine products",
    "Gems and jewellery",
    "Ceramic products and glassware",
    "Cereals",
    "Textiles and garments",
    "Foot wear",
    "Artificial jewellery",
    "Dry fruits",
    "Rice ( basmati and non basmati )",
    "Dry Coconut",
    "Amla",
    "Tamirind",
    "cocopeat"
];

async function seed() {
    for (const name of categories) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        // Check if it already exists to avoid duplicates
        const { data: existing } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', slug)
            .maybeSingle();

        if (!existing) {
            console.log(`Inserting: ${name}`);
            const { error } = await supabase
                .from('categories')
                .insert([{ name, slug }]);

            if (error) {
                console.error(`Error inserting ${name}:`, error.message);
            }
        } else {
            console.log(`Skipping ${name}, already exists.`);
        }
    }
    console.log("Done seeding categories.");
}

seed();
