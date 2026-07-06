<?php

namespace App\Repositories\Eloquent;

use App\Models\ContactMessage;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ContactMessageRepository extends BaseRepository implements ContactMessageRepositoryInterface
{
    public function __construct(ContactMessage $model)
    {
        parent::__construct($model);
    }

    public function getUnreadMessages(): Collection
    {
        return $this->model->newQuery()
            ->where('is_read', false)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function markAsRead(int|string $id): bool
    {
        $message = $this->findOrFail($id);

        return $message->update(['is_read' => true]);
    }
}
