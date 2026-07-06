@extends('layouts.admin')

@section('title', 'Company Settings')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Company Settings</h1>
</div>

<form action="{{ route('admin.settings.update') }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    
    <div class="row">
        <div class="col-lg-8">
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-body">
                    <!-- Nav Tabs -->
                    <ul class="nav nav-tabs mb-4" id="settingsTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active fw-bold" id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="true">General Info</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link fw-bold" id="social-tab" data-bs-toggle="tab" data-bs-target="#social" type="button" role="tab" aria-controls="social" aria-selected="false">Social Media</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link fw-bold" id="media-tab" data-bs-toggle="tab" data-bs-target="#media" type="button" role="tab" aria-controls="media" aria-selected="false">Site Branding</button>
                        </li>
                    </ul>

                    <!-- Tab Panes -->
                    <div class="tab-content" id="settingsTabContent">
                        <!-- General Info -->
                        <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
                            <div class="mb-3">
                                <label for="company_name" class="form-label fw-bold">Company Name <span class="text-danger">*</span></label>
                                <input type="text" name="company_name" id="company_name" class="form-control" value="{{ old('company_name', $settings->company_name) }}" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="address" class="form-label fw-bold">Address</label>
                                <textarea name="address" id="address" rows="3" class="form-control">{{ old('address', $settings->address) }}</textarea>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="phone" class="form-label fw-bold">Office Phone</label>
                                    <input type="text" name="phone" id="phone" class="form-control" value="{{ old('phone', $settings->phone) }}">
                                </div>
                                <div class="col-md-6">
                                    <label for="email" class="form-label fw-bold">Official Email</label>
                                    <input type="email" name="email" id="email" class="form-control" value="{{ old('email', $settings->email) }}">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="whatsapp" class="form-label fw-bold">WhatsApp Hotline</label>
                                <input type="text" name="whatsapp" id="whatsapp" class="form-control" value="{{ old('whatsapp', $settings->whatsapp) }}" placeholder="e.g. +6281234567890">
                                <div class="form-text small">Use international format with plus sign (+) for link redirection.</div>
                            </div>
                        </div>

                        <!-- Social Media -->
                        <div class="tab-pane fade" id="social" role="tabpanel" aria-labelledby="social-tab">
                            <div class="mb-3">
                                <label for="facebook" class="form-label fw-bold"><i class="fa-brands fa-facebook text-primary me-1"></i> Facebook Page URL</label>
                                <input type="url" name="facebook" id="facebook" class="form-control" value="{{ old('facebook', $settings->facebook) }}" placeholder="https://facebook.com/yourpage">
                            </div>
                            <div class="mb-3">
                                <label for="instagram" class="form-label fw-bold"><i class="fa-brands fa-instagram text-danger me-1"></i> Instagram Profile URL</label>
                                <input type="url" name="instagram" id="instagram" class="form-control" value="{{ old('instagram', $settings->instagram) }}" placeholder="https://instagram.com/username">
                            </div>
                            <div class="mb-3">
                                <label for="linkedin" class="form-label fw-bold"><i class="fa-brands fa-linkedin text-info me-1"></i> LinkedIn Company URL</label>
                                <input type="url" name="linkedin" id="linkedin" class="form-control" value="{{ old('linkedin', $settings->linkedin) }}" placeholder="https://linkedin.com/company/yourcompany">
                            </div>
                            <div class="mb-3">
                                <label for="youtube" class="form-label fw-bold"><i class="fa-brands fa-youtube text-danger me-1"></i> YouTube Channel URL</label>
                                <input type="url" name="youtube" id="youtube" class="form-control" value="{{ old('youtube', $settings->youtube) }}" placeholder="https://youtube.com/channel/yourchannel">
                            </div>
                        </div>

                        <!-- Site Branding / Assets -->
                        <div class="tab-pane fade" id="media" role="tabpanel" aria-labelledby="media-tab">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Company Logo</label>
                                    @if($settings->logo)
                                        <div class="mb-2 bg-light p-3 border rounded text-center">
                                            <img src="{{ url(\Illuminate\Support\Facades\Storage::url($settings->logo)) }}" style="max-height: 60px;">
                                        </div>
                                    @endif
                                    <input class="form-control" type="file" id="logo" name="logo" accept="image/*">
                                    <div class="form-text small font-monospace">PNG transparent recommended. Max: 3MB.</div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Favicon</label>
                                    @if($settings->favicon)
                                        <div class="mb-2 bg-light p-3 border rounded text-center">
                                            <img src="{{ url(\Illuminate\Support\Facades\Storage::url($settings->favicon)) }}" style="max-height: 32px;">
                                        </div>
                                    @endif
                                    <input class="form-control" type="file" id="favicon" name="favicon" accept="image/*">
                                    <div class="form-text small font-monospace">1:1 square icon. Max: 1MB.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Hero Background Image</label>
                                @if($settings->hero_image)
                                    <div class="mb-2">
                                        <img src="{{ url(\Illuminate\Support\Facades\Storage::url($settings->hero_image)) }}" class="img-thumbnail" style="max-height: 150px; width: 100%; object-fit: cover;">
                                    </div>
                                @endif
                                <input class="form-control" type="file" id="hero_image" name="hero_image" accept="image/*">
                                <div class="form-text small">Recommended: 1920x800px. Max: 10MB.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-white py-3 border-bottom">
                    <h5 class="card-title mb-0 fw-bold">Publish Options</h5>
                </div>
                <div class="card-body">
                    <p class="text-muted small">Updating these settings will immediately affect the configuration data served to the Next.js frontend API.</p>
                    <button type="submit" class="btn btn-primary w-100 py-2"><i class="fa-solid fa-floppy-disk me-1"></i> Save Configurations</button>
                </div>
            </div>
        </div>
    </div>
</form>
@endsection
