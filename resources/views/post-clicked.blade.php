@extends('layouts.app')
@section('content')


<form>
    <input type="hidden" id="slug" value="{{$post->slug}}">
</form>

<post-clicked trashed="{{$post->trashed()}}" currenturl="{{Request::url()}}" ></post-clicked>
@endsection

