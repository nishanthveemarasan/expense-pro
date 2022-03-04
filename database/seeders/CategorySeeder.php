<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // dd($this->data()[0]);
        for ($i = 0; $i < count($this->data()); $i++) {

            Category::firstOrCreate(['id' => $i + 1], $this->data()[$i]);
        }
    }

    public function data()
    {
        return array(

            array(
                'category' => 'Automobile',
                'items' =>
                array(
                    'Fuel',
                    'insurance',
                    'Lease',
                    'Maintainance',
                    'Registration',
                ),
                'color' => 'primary',
            ),

            array(
                'category' => 'EnterTainment',
                'items' =>
                array(
                    'Concert',
                    'Movies',
                    'Party',
                    'Sports',
                ),
                'color' => 'warning',
            ),

            array(
                'category' => 'Food',
                'items' =>
                array(
                    'Groceries',
                    'Restaurent',
                ),
                'color' => 'danger',
            ),

            array(
                'category' => 'Health',
                'items' =>
                array(
                    'Medical',
                    'Prescription',
                    'Insurance',
                ),
                'color' => 'dark',
            ),

            array(
                'category' => 'House',
                'items' =>
                array(
                    'Appliance',
                    'Home Maintenance',
                    'Rent',
                    3 => 'House Items',
                ),
                'color' => 'secondary',
            ),

            array(
                'category' => 'Electronices',
                'items' =>
                array(
                    'Computer',
                    'Electronics',
                    'Stationary',
                    3 => 'House Items',
                ),
                'color' => 'danger',
            ),

            array(
                'category' => 'Loans',
                'items' =>
                array(
                    'Student',
                    'Mortage',
                    'Car Loans',
                    'Other Loans',
                ),
                'color' => 'info',
            ),

            array(
                'category' => 'Personal',
                'items' =>
                array(
                    'Clothing',
                    'Donation',
                    'Gift',
                    'Shopping',
                ),
                'color' => 'success',
            ),

            array(
                'category' => 'Utilities',
                'items' =>
                array(
                    'Electric',
                    'Gas',
                    2 => 'Internet',
                    'Telephone',
                    'Water',
                ),
                'color' => 'primary',
            ),

            array(
                'category' => 'Vacation',
                'items' =>
                array(
                    'Aroplane',
                    'Food',
                    2 => 'Hotel',
                    'Transport',
                ),
                'color' => 'warning',
            ),
        );
    }
}
