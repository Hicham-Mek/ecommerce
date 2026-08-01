<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;



class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );
        // Customers
        User::factory(30)->create();

        // Categories
        $categories = [
            'Electronics',
            'Fashion',
            'Gaming',
            'Home & Kitchen',
            'Beauty',
            'Sports',
            'Books',
            'Accessories',
            'Baby',
            'Grocery',
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['slug' => Str::slug($category)],
                [
                    'name' => $category,
                    'is_active' => true,
                ]
            );
        }

        // Products
        $products = [

            // Electronics
            ['name' => 'iPhone 16 Pro', 'category' => 'Electronics', 'price' => 1199, 'image' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'],
            ['name' => 'Samsung Galaxy S25', 'category' => 'Electronics', 'price' => 999, 'image' => 'https://images.unsplash.com/photo-1580910051074-3eb694886505'],
            ['name' => 'MacBook Air M4', 'category' => 'Electronics', 'price' => 1399, 'image' => 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8'],
            ['name' => 'Sony WH-1000XM5', 'category' => 'Electronics', 'price' => 399, 'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
            ['name' => 'Apple Watch Series 10', 'category' => 'Electronics', 'price' => 499, 'image' => 'https://images.unsplash.com/photo-1546868871-7041f2a55e12'],

            // Fashion
            ['name' => 'Nike Air Max 270', 'category' => 'Fashion', 'price' => 159, 'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
            ['name' => 'Adidas Ultraboost', 'category' => 'Fashion', 'price' => 189, 'image' => 'https://images.unsplash.com/photo-1543508282-6319a3e2621f'],
            ['name' => 'Levi\'s Denim Jacket', 'category' => 'Fashion', 'price' => 99, 'image' => 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b'],
            ['name' => 'Puma Hoodie', 'category' => 'Fashion', 'price' => 69, 'image' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'],
            ['name' => 'Ray-Ban Sunglasses', 'category' => 'Fashion', 'price' => 179, 'image' => 'https://images.unsplash.com/photo-1511499767150-a48a237f0083'],

            // Gaming
            ['name' => 'PlayStation 5', 'category' => 'Gaming', 'price' => 499, 'image' => 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db'],
            ['name' => 'Xbox Series X', 'category' => 'Gaming', 'price' => 499, 'image' => 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d'],
            ['name' => 'Nintendo Switch OLED', 'category' => 'Gaming', 'price' => 349, 'image' => 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e'],
            ['name' => 'Logitech G Pro X', 'category' => 'Gaming', 'price' => 129, 'image' => 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf'],
            ['name' => 'Razer DeathAdder V3', 'category' => 'Gaming', 'price' => 79, 'image' => 'https://images.unsplash.com/photo-1527814050087-3793815479db'],

            // Home
            ['name' => 'Modern Coffee Table', 'category' => 'Home & Kitchen', 'price' => 299, 'image' => 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'],
            ['name' => 'Office Chair', 'category' => 'Home & Kitchen', 'price' => 249, 'image' => 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455'],
            ['name' => 'Floor Lamp', 'category' => 'Home & Kitchen', 'price' => 89, 'image' => 'https://images.unsplash.com/photo-1513694203232-719a280e022f'],
            ['name' => 'Kitchen Blender', 'category' => 'Home & Kitchen', 'price' => 119, 'image' => 'https://images.unsplash.com/photo-1570222094114-d054a817e56b'],
            ['name' => 'Air Fryer', 'category' => 'Home & Kitchen', 'price' => 149, 'image' => 'https://images.unsplash.com/photo-1585515656836-2dcb7c6f4d52'],

            // Beauty
            ['name' => 'Vitamin C Serum', 'category' => 'Beauty', 'price' => 29, 'image' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be'],
            ['name' => 'Face Moisturizer', 'category' => 'Beauty', 'price' => 24, 'image' => 'https://images.unsplash.com/photo-1556228578-8c89e6adf883'],
            ['name' => 'Perfume', 'category' => 'Beauty', 'price' => 89, 'image' => 'https://images.unsplash.com/photo-1594035910387-fea47794261f'],

            // Sports
            ['name' => 'Football', 'category' => 'Sports', 'price' => 39, 'image' => 'https://images.unsplash.com/photo-1517649763962-0c623066013b'],
            ['name' => 'Basketball', 'category' => 'Sports', 'price' => 35, 'image' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc'],
            ['name' => 'Yoga Mat', 'category' => 'Sports', 'price' => 29, 'image' => 'https://images.unsplash.com/photo-1518611012118-696072aa579a'],

            // Books
            ['name' => 'Clean Code', 'category' => 'Books', 'price' => 49, 'image' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794'],
            ['name' => 'Atomic Habits', 'category' => 'Books', 'price' => 24, 'image' => 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d'],

            // Accessories
            ['name' => 'Leather Wallet', 'category' => 'Accessories', 'price' => 59, 'image' => 'https://images.unsplash.com/photo-1627123424574-724758594e93'],
            ['name' => 'Travel Backpack', 'category' => 'Accessories', 'price' => 99, 'image' => 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'],

            // Baby
            ['name' => 'Baby Stroller', 'category' => 'Baby', 'price' => 299, 'image' => 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4'],
            ['name' => 'Baby Toy Set', 'category' => 'Baby', 'price' => 39, 'image' => 'https://images.unsplash.com/photo-1516627145497-ae6968895b75'],

            // Grocery
            ['name' => 'Organic Coffee Beans', 'category' => 'Grocery', 'price' => 19, 'image' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'],
            ['name' => 'Extra Virgin Olive Oil', 'category' => 'Grocery', 'price' => 15, 'image' => 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5'],
        ];

        foreach ($products as $item) {
            $category = Category::where('name', $item['category'])->first();

            if (!$category) {
                continue;
            }

            Product::updateOrCreate(
                ['slug' => Str::slug($item['name'])],
                [
                    'category_id' => $category->id,
                    'name' => $item['name'],
                    'description' => $item['name'] . ' - Premium quality product.',
                    'price' => $item['price'],
                    'stock' => rand(10, 100),
                    'image' => $item['image'],
                    'is_active' => true,
                ]
            );
        }

        Order::factory(100)->create()->each(function ($order) {

            $products = Product::inRandomOrder()
                ->take(rand(1, 5))
                ->get();

            $total = 0;

            foreach ($products as $product) {

                $qty = rand(1, 3);

                $price = $product->price;

                $order->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'price' => $price,
                ]);

                $total += $qty * $price;
            }

            $order->update([
                'total' => $total,
            ]);
        });

    }
}
