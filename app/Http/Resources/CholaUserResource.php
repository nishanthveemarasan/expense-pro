<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CholaUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return  [
            "name" =>  $this->name,
            "email" => $this->roles[0]['name'] == 'chola_admin' ? $this->email : '',
            "username" =>  $this->username,
            "status" =>  $this->status,
            "roles" =>  $this->roles
        ];
    }
}
