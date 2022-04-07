<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "uuid" => $this->uuid,
            "title" => $this->title,
            "completed" => $this->completed,
            "date" => $this->date->format('Y-m-d'),
            "type" => $this->type,
            "updated_at" => $this->updated_at->format('Y-m-d'),
            "items" => TaskItemResource::collection($this->items)

        ];
    }
}
