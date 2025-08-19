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

## Purpose

This infrastructure enables hosting a static Next.js blog by creating a publicly accessible S3 bucket that can serve HTML, CSS, and JavaScript files to web browsers.