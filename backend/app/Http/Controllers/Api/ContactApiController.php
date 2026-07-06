<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ContactRequest;
use App\Http\Resources\ContactMessageResource;
use App\Services\ContactMessageService;
use Illuminate\Http\Request;

class ContactApiController extends ApiController
{
    protected ContactMessageService $messageService;

    public function __construct(ContactMessageService $messageService)
    {
        $this->messageService = $messageService;
    }

    /**
     * Submit a new contact message (Public).
     */
    public function store(ContactRequest $request)
    {
        $message = $this->messageService->create($request->validated());

        return $this->successResponse(
            new ContactMessageResource($message),
            'Your contact message was submitted successfully. We will contact you soon.',
            21
        );
    }

    /**
     * Retrieve list of contact messages (Admin).
     */
    public function index(Request $request)
    {
        $unreadOnly = $request->query('unread', false);

        if ($unreadOnly) {
            $messages = $this->messageService->getUnread();
        } else {
            $messages = $this->messageService->getAll();
        }

        return $this->successResponse(
            ContactMessageResource::collection($messages),
            'Contact messages retrieved successfully'
        );
    }

    /**
     * Mark message as read (Admin).
     */
    public function read($id)
    {
        $message = $this->messageService->markAsRead($id);

        return $this->successResponse(
            new ContactMessageResource($message),
            'Message marked as read'
        );
    }

    /**
     * Delete contact message (Admin).
     */
    public function destroy($id)
    {
        $this->messageService->delete($id);

        return $this->successResponse(null, 'Message deleted successfully');
    }
}
