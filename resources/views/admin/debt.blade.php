@extends('Layout.admin')

@section('title', 'Debt Manager')

@section('content')
<div id="debt" data="{{ json_encode($data['data'])}}" token="{{$data['token']}}"></div>
@endsection