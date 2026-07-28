<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::inRandomOrder()->first()->id,

            'name' => fake()->words(3, true),

            'slug' => fake()->unique()->slug(),

            'description' => fake()->paragraph(),

            'price' => fake()->randomFloat(2, 10, 500),

            'stock' => fake()->numberBetween(0, 100),

            'image' => null,

            'is_active' => true,
        ];
    }
}
