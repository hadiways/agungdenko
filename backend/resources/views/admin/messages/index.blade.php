@extends('layouts.admin')

@section('title', 'Inbox')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Inbox / Leads</h1>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th>Sender</th>
                        <th>Subject / Message Preview</th>
                        <th>Received</th>
                        <th style="width: 150px;" class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($messages as $msg)
                        <tr class="{{ !$msg->is_read ? 'table-warning fw-bold' : '' }}">
                            <td>
                                <div>{{ $msg->name }}</div>
                                <small class="text-muted">{{ $msg->company ?? 'No Company' }}</small>
                            </td>
                            <td>
                                <div>{{ $msg->subject }}</div>
                                <div class="text-muted small text-truncate" style="max-width: 450px;">{{ $msg->message }}</div>
                            </td>
                            <td>{{ $msg->created_at->diffForHumans() }}</td>
                            <td class="text-center">
                                <div class="d-flex justify-content-center gap-2">
                                    <a href="{{ route('admin.messages.show', $msg->id) }}" class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-eye"></i> View</a>
                                    <form action="{{ route('admin.messages.destroy', $msg->id) }}" method="POST" onsubmit="return confirm('Delete message?')" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="text-center py-5 text-muted">Inbox is empty.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @if($messages->hasPages())
        <div class="card-footer bg-white border-top py-3">
            {{ $messages->links() }}
        </div>
    @endif
</div>
@endsection
