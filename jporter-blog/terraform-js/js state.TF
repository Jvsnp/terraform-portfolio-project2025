terraform{
    backend "s3" {
        bucket = "jporter-blog-terraform-state"
        key = "terraform.tfstate"
        region = "us-east-1"
        dynamodb_table = "jporter-blog-terraform-locks"
    }
}