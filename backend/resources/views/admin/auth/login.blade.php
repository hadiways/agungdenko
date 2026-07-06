<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - PT Denko Wahana Sakti</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #0B1B2B;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            background-color: #fff;
            width: 100%;
            max-width: 420px;
            overflow: hidden;
        }
        .login-header {
            background-color: #084C8F;
            color: #fff;
            padding: 30px 20px;
            text-align: center;
        }
        .login-body {
            padding: 40px 30px;
        }
        .btn-primary {
            background-color: #084C8F;
            border-color: #084C8F;
            font-weight: 600;
            padding: 10px;
        }
        .btn-primary:hover {
            background-color: #063d73;
            border-color: #063d73;
        }
    </style>
</head>
<body>

<div class="login-card">
    <div class="login-header">
        <h4 class="mb-0"><i class="fa-solid fa-truck-ramp-box me-2"></i>DWS Portal Admin</h4>
        <small class="text-white-50">PT Denko Wahana Sakti</small>
    </div>
    <div class="login-body">
        @if($errors->any())
            <div class="alert alert-danger py-2 mb-3">
                <ul class="mb-0 small">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('admin.login.submit') }}" method="POST">
            @csrf
            <div class="mb-3">
                <label for="email" class="form-label text-muted small fw-bold">EMAIL ADDRESS</label>
                <div class="input-group">
                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-envelope text-muted"></i></span>
                    <input type="email" name="email" id="email" class="form-control bg-light border-start-0" placeholder="admin@dws.co.id" value="{{ old('email') }}" required autofocus>
                </div>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label text-muted small fw-bold">PASSWORD</label>
                <div class="input-group">
                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-lock text-muted"></i></span>
                    <input type="password" name="password" id="password" class="form-control bg-light border-start-0" placeholder="••••••••" required>
                </div>
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" name="remember" class="form-check-input" id="remember">
                <label class="form-check-label text-muted small" for="remember">Remember me</label>
            </div>

            <button type="submit" class="btn btn-primary w-100"><i class="fa-solid fa-right-to-bracket me-2"></i>Sign In</button>
        </form>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
