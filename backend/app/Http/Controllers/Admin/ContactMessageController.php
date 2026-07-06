<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ContactMessageService;

class ContactMessageController extends Controller
{
    protected ContactMessageService $messageService;

    public function __construct(ContactMessageService $messageService)
    {
        $this->messageService = $messageService;
    }

    public function index()
    {
        $messages = $this->messageService->paginate(15);

        return view('admin.messages.index', compact('messages'));
    }

    public function show($id)
    {
        // View message and mark as read
        $message = $this->messageService->findById($id);
        if (! $message->is_read) {
            $this->messageService->markAsRead($id);
        }

        return view('admin.messages.show', compact('message'));
    }

    public function destroy($id)
    {
        $this->messageService->delete($id);

        return redirect()->route('admin.messages.index')->with('success', 'Message deleted successfully.');
    }
}
