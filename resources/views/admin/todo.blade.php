@extends('Layout.admin')

@section('title', 'Todo Manager')

@section('content')

<div id="Todo" data="{{ $data['data']}}" token="{{$data['token']}}"></div>
@endsection