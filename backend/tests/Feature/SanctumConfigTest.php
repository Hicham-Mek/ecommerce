<?php

namespace Tests\Feature;

use Tests\TestCase;

class SanctumConfigTest extends TestCase
{
    public function test_sanctum_stateful_domains_include_frontend_hosts(): void
    {
        $statefulDomains = config('sanctum.stateful');

        $this->assertContains('localhost', $statefulDomains);
        $this->assertContains('ecommerce-chi-orcin.vercel.app', $statefulDomains);
        $this->assertContains('ecommerce-nx2k.onrender.com', $statefulDomains);
    }

    public function test_cors_allows_local_and_vercel_frontends(): void
    {
        $allowedOrigins = config('cors.allowed_origins');

        $this->assertContains('http://localhost:5173', $allowedOrigins);
        $this->assertContains('http://127.0.0.1:5173', $allowedOrigins);
        $this->assertContains('https://ecommerce-chi-orcin.vercel.app', $allowedOrigins);
    }
}
