@extends('Layout.admin')

@section('title', 'Dashboard')

@section('content')
<div id="debt" data="{{ json_encode($data)}}"></div>
@endsection