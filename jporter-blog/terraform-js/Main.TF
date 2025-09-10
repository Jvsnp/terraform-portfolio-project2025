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

# Origin Access Identity for CloudFront
resource "aws_cloudfront_origin_access_identity" "blog_oai" {
  comment = "OAI for jporter-blog S3 bucket portfolio site"
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "blog_distribution" {
  origin {
    domain_name = aws_s3_bucket.blog_bucket.bucket_regional_domain_name
    origin_id   = "S3Origin-nextjs-portfolio-bucket"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.blog_oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for jporter-blog S3 bucket portfolio site"
  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id       = "S3Origin-nextjs-portfolio-bucket"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  price_class = "PriceClass_100"

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}