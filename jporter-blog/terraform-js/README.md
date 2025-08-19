# S3 Blog Bucket Infrastructure

This Terraform configuration creates AWS S3 infrastructure for hosting a static blog website.

## Resources Created

### 1. AWS Provider
```hcl
provider "aws" {
  region = "us-east-1"
}
```
- Configures AWS provider to deploy resources in US East 1 region

### 2. S3 Bucket
```hcl
resource "aws_s3_bucket" "blog_bucket" {
  bucket = "jporter-blog-bucket"
}
```
- Creates S3 bucket named "jporter-blog-bucket" for hosting static website files

### 3. Bucket Ownership Controls
```hcl
resource "aws_s3_bucket_ownership_controls" "blog_bucket_ownership" {
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}
```
- Sets bucket owner as preferred owner of all objects
- Required for ACL configuration

### 4. Public Access Block
```hcl
resource "aws_s3_bucket_public_access_block" "jporter_blog_access_block" {
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
```
- Disables all public access restrictions
- Allows bucket to serve public content for website hosting

### 5. Bucket ACL
```hcl
resource "aws_s3_bucket_acl" "blog_bucket_acl" {
  acl = "public-read"
}
```
- Sets bucket ACL to "public-read"
- Allows public read access to all objects in bucket

### 6. Bucket Policy
```hcl
resource "aws_s3_bucket_policy" "blog_bucket_policy" {
  policy = jsonencode({
    Statement = [{
      Sid = "PublicReadGetObject"
      Effect = "Allow"
      Principal = "*"
      Action = "s3:GetObject"
      Resource = "${aws_s3_bucket.blog_bucket.arn}/*"
    }]
  })
}
```
- Creates IAM policy allowing public read access to all objects
- Enables website hosting by allowing anonymous users to download files

## Usage

1. Initialize Terraform: `terraform init`
2. Plan deployment: `terraform plan`
3. Apply changes: `terraform apply`
4. Upload your Next.js build files to the S3 bucket
5. Access your site via the CloudFront distribution URL

### 7. CloudFront Origin Access Identity
```hcl
resource "aws_cloudfront_origin_access_identity" "blog_oai" {
  comment = "OAI for jporter-blog S3 bucket portfolio site"
}
```
- Creates Origin Access Identity for secure CloudFront-to-S3 communication
- Allows CloudFront to access S3 bucket without making it publicly accessible

### 8. CloudFront Distribution
```hcl
resource "aws_cloudfront_distribution" "blog_distribution" {
  origin {
    domain_name = aws_s3_bucket.blog_bucket.bucket_regional_domain_name
    origin_id   = "S3Origin-nextjs-portfolio-bucket"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.blog_oai.cloudfront_access_identity_path
    }
  }
  enabled = true
  is_ipv6_enabled = true
  default_root_object = "index.html"
}
```
- Creates global CDN distribution for fast content delivery
- Configures S3 bucket as origin with OAI for secure access
- Enables IPv6 support and sets index.html as default page
- Redirects HTTP to HTTPS for security
- Configures caching with TTL settings (0s min, 1hr default, 24hr max)
- Uses PriceClass_100 for cost optimization (US, Canada, Europe)
- No geographic restrictions applied

## Purpose

This infrastructure creates a complete static website hosting solution with:
- **S3 Bucket**: Stores static website files
- **CloudFront CDN**: Provides global content delivery with caching
- **Security**: HTTPS enforcement and Origin Access Identity
- **Performance**: Edge caching reduces load times worldwide

Perfect for hosting a static Next.js blog with global reach and optimal performance.