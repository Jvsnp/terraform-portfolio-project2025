provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "blog_bucket" {
  bucket = "jporter-blog-bucket"
}

# Bucket ownership controls
resource "aws_s3_bucket_ownership_controls" "blog_bucket_ownership" {
  bucket = aws_s3_bucket.blog_bucket.id
  
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Public access block configuration
resource "aws_s3_bucket_public_access_block" "jporter_blog_access_block" {
  bucket = aws_s3_bucket.blog_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Bucket ACL configuration
resource "aws_s3_bucket_acl" "blog_bucket_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.blog_bucket_ownership, aws_s3_bucket_public_access_block.jporter_blog_access_block]
  bucket = aws_s3_bucket.blog_bucket.id
  acl    = "public-read"
}

# Bucket policy
resource "aws_s3_bucket_policy" "blog_bucket_policy" {
  bucket = aws_s3_bucket.blog_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "PublicReadGetObject"
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.blog_bucket.arn}/*"
      }
    ]
  })
}