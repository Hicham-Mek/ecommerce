<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Str;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $query = Category::query();
    
    if (!request()->user() || request()->user()->role !== 'admin') {
        $query->where('is_active', true);
    }

    return response()->json(
        $query->latest()->paginate(10)
    );
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
{
    $category = Category::create([
        'name' => $request->name,
        'slug' => Str::slug($request->name),
        'description' => $request->description,
        'image' => null,
        'is_active' => $request->is_active,
    ]);

    return response()->json([
        'message' => 'Category created successfully.',
        'category' => $category,
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
{
    return response()->json($category);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
{
    $category->update([
        'name' => $request->name,
        'slug' => Str::slug($request->name),
        'description' => $request->description,
        'is_active' => $request->is_active,
    ]);

    return response()->json([
        'message' => 'Category updated successfully.',
        'category' => $category,
    ]);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
{
    $category->delete();

    return response()->json([
        'message' => 'Category deleted successfully.',
    ]);
}
}
