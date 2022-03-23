@extends('Layout.admin')

@section('title', 'Saving Manager')

@section('content')

<div id="saving" data="{{ $data['data']}}" token="{{$data['token']}}"></div>
@endsection