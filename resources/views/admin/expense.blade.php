@extends('Layout.admin')

@section('title', 'Expense Manager')

@section('content')
<div id="expense" data="{{ json_encode($data['data'])}}" token="{{$data['token']}}"></div>
@endsection