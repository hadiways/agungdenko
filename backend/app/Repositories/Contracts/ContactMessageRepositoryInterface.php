<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface ContactMessageRepositoryInterface extends BaseRepositoryInterface
{
    public function getUnreadMessages(): Collection;
    public function markAsRead(int|string $id): bool;
}
