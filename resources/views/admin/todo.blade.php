@extends('Layout.admin')

@section('title', 'Dashboard')

@section('content')

<div id="Todo" data="{{ $data['data']}}" token="{{$data['token']}}"></div>
@endsection