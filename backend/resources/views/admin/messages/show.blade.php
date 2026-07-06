@extends('layouts.admin')

@section('title', 'Read Message')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Message Details</h1>
    <a href="{{ route('admin.messages.index') }}" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-arrow-left me-1"></i> Back to Inbox</a>
</div>

<div class="card border-0 shadow-sm max-width-800">
    <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
        <div>
            <h5 class="mb-0 fw-bold">{{ $message->subject }}</h5>
            <small class="text-muted">From: <strong>{{ $message->name }}</strong> ({{ $message->email }})</small>
        </div>
        <span class="text-muted small">{{ $message->created_at->format('M d, Y h:i A') }}</span>
    </div>
    <div class="card-body">
        <div class="row mb-4 p-3 bg-light rounded small">
            <div class="col-md-6 mb-2">
                <strong>Company:</strong> {{ $message->company ?? '-' }}
            </div>
            <div class="col-md-6 mb-2">
                <strong>Phone:</strong> {{ $message->phone ?? '-' }}
            </div>
            <div class="col-md-6">
                <strong>Email:</strong> <a href="mailto:{{ $message->email }}">{{ $message->email }}</a>
            </div>
        </div>

        <h6 class="fw-bold mb-2">Message:</h6>
        <div class="p-3 border rounded bg-white text-dark" style="white-space: pre-wrap; line-height: 1.6;">{{ $message->message }}</div>
    </div>
    <div class="card-footer bg-white border-top-0 d-flex justify-content-end gap-2">
        <a href="mailto:{{ $message->email }}?subject=Re: {{ $message->subject }}" class="btn btn-primary"><i class="fa-solid fa-reply me-1"></i> Reply via Email</a>
        <form action="{{ route('admin.messages.destroy', $message->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this message?')" class="d-inline">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger"><i class="fa-solid fa-trash me-1"></i> Delete Message</button>
        </form>
    </div>
</div>
@endsection
