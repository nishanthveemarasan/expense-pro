@extends('Layout.admin')

@section('title', 'Dashboard')

@section('content')
<div id="expense" data="{{ json_encode($data)}}"></div>
@endsection