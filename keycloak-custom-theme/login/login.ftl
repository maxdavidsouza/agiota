<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset="UTF-8" />
		<title>A.G.I.O.T.A.</title>
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
			rel="stylesheet"
		/>
	</head>
	<body>
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6">
					<h1 class="text-center mt-5">${msg("Login")}</h1>
					<form
						id="kc-form-login"
						onsubmit="login.disabled = true; return true;"
						action="${url.loginAction}"
						method="post"
					>
						<div class="mb-3">
							<label for="username" class="form-label"
								>${msg("Usuário")}</label
							>
							<input
								type="text"
								id="username"
								name="username"
								class="form-control"
								autofocus
							/>
						</div>
						<div class="mb-3">
							<label for="password" class="form-label"
								>${msg("Senha")}</label
							>
							<input
								type="password"
								id="password"
								name="password"
								class="form-control"
							/>
						</div>
						<div class="d-grid">
							<button type="submit" class="btn btn-primary">
								${msg("Entrar")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- Incluir o JS do Bootstrap -->
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
	</body>
</html>
