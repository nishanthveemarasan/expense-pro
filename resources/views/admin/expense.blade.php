@extends('Layout.admin')

@section('title', 'Dashboard')

@section('content')
<div id="expense" data="{{ json_encode($data['data'])}}" token="{{$data['token']}}"></div>
@endsection