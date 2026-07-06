<?php

namespace App\Services;

use App\Models\ContactMessage;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;

class ContactMessageService
{
    protected ContactMessageRepositoryInterface $contactMessageRepository;
    protected ActivityLogService $activityLog;

    public function __construct(
        ContactMessageRepositoryInterface $contactMessageRepository,
        ActivityLogService $activityLog
    ) {
        $this->contactMessageRepository = $contactMessageRepository;
        $this->activityLog = $activityLog;
    }

    public function getAll()
    {
        return $this->contactMessageRepository->all();
    }

    public function paginate(int $perPage = 15)
    {
        return $this->contactMessageRepository->paginate($perPage);
    }

    public function getUnread()
    {
        return $this->contactMessageRepository->getUnreadMessages();
    }

    public function findById(int|string $id): ContactMessage
    {
        return $this->contactMessageRepository->findOrFail($id);
    }

    public function create(array $data): ContactMessage
    {
        // Public action, no auth required, just create
        return $this->contactMessageRepository->create($data);
    }

    public function markAsRead(int|string $id): ContactMessage
    {
        $this->contactMessageRepository->markAsRead($id);
        $message = $this->contactMessageRepository->findOrFail($id);

        $this->activityLog->log('READ_MESSAGE', "Marked contact message from {$message->name} (ID: {$message->id}) as read");

        return $message;
    }

    public function delete(int|string $id): bool
    {
        $message = $this->contactMessageRepository->findOrFail($id);
        $deleted = $this->contactMessageRepository->delete($id);

        if ($deleted) {
            $this->activityLog->log('DELETE_MESSAGE', "Deleted contact message from {$message->name} (ID: {$message->id})");
        }

        return $deleted;
    }
}
