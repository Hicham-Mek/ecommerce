<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'total' => $this->faker->randomFloat(2, 30, 800),
            'payment_method' => 'cash_on_delivery',
            'status' => $this->faker->randomElement([
                'pending',
                'processing',
                'shipped',
                'delivered',
                'cancelled',
            ]),
        ];
    }
}
