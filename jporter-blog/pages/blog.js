export default function Blog() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Building a Serverless Blog with Next.js, AWS S3, and CloudFront</h1>
      
      <p><em>Published: August 20, 2025</em></p>
      
      <h2>Overview</h2>
      <p>
        In this project, I built a modern, serverless blog using Next.js for the frontend and AWS infrastructure 
        for hosting and global content delivery. The entire setup is managed as Infrastructure as Code using Terraform.
      </p>
      
      <h2>Architecture</h2>
      <p>The solution consists of three main components:</p>
      <ul>
        <li><strong>Next.js Application</strong> - Static site generator with React</li>
        <li><strong>AWS S3</strong> - Static website hosting</li>
        <li><strong>AWS CloudFront</strong> - Global CDN for fast content delivery</li>
      </ul>
      
      <h2>Technology Stack</h2>
      
      <h3>Frontend</h3>
      <ul>
        <li><strong>Next.js 15.4.7</strong> - React framework with static export capability</li>
        <li><strong>Static Generation</strong> - Pre-built HTML/CSS/JS files for optimal performance</li>
        <li><strong>Responsive Design</strong> - Mobile-friendly layout</li>
      </ul>
      
      <h3>Infrastructure</h3>
      <ul>
        <li><strong>AWS S3</strong> - Object storage configured for static website hosting</li>
        <li><strong>AWS CloudFront</strong> - Content Delivery Network with global edge locations</li>
        <li><strong>Terraform</strong> - Infrastructure as Code for reproducible deployments</li>
      </ul>
      
      <h2>Key Features</h2>
      
      <h3>Performance</h3>
      <ul>
        <li>Static files served from global CDN edge locations</li>
        <li>Optimized caching with 1-hour default TTL</li>
        <li>Compressed content delivery</li>
        <li>HTTP/2 support</li>
      </ul>
      
      <h3>Security</h3>
      <ul>
        <li>HTTPS enforced on all connections</li>
        <li>Public read-only access to content</li>
        <li>No server-side vulnerabilities (static content only)</li>
      </ul>
      
      <h3>Scalability</h3>
      <ul>
        <li>Serverless architecture - no servers to manage</li>
        <li>Auto-scaling CDN handles traffic spikes</li>
        <li>Pay-per-use pricing model</li>
      </ul>
      
      <h2>Deployment Process</h2>
      
      <h3>1. Next.js Setup</h3>
      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
{`npm init next-app jporter-blog
cd jporter-blog
npm run build`}
      </pre>
      
      <h3>2. Infrastructure Provisioning</h3>
      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
{`terraform init
terraform plan
terraform apply`}
      </pre>
      
      <h3>3. Content Deployment</h3>
      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
{`aws s3 sync out/ s3://jporter-blog-bucket --delete`}
      </pre>
      
      <h2>Infrastructure Details</h2>
      
      <h3>S3 Configuration</h3>
      <ul>
        <li><strong>Bucket</strong>: jporter-blog-bucket</li>
        <li><strong>Region</strong>: us-east-1</li>
        <li><strong>Website Hosting</strong>: Enabled with index.html and 404.html</li>
        <li><strong>Public Access</strong>: Configured for public read access</li>
      </ul>
      
      <h3>CloudFront Distribution</h3>
      <ul>
        <li><strong>Domain</strong>: d2q85jfmmtyamu.cloudfront.net</li>
        <li><strong>Origin</strong>: S3 bucket regional endpoint</li>
        <li><strong>Caching</strong>: Optimized for static content</li>
        <li><strong>Geographic Distribution</strong>: Global (no restrictions)</li>
      </ul>
      
      <h2>Benefits of This Architecture</h2>
      
      <h3>Cost Efficiency</h3>
      <p>
        Serverless architecture means you only pay for what you use. S3 storage costs are minimal, 
        and CloudFront charges are based on actual data transfer.
      </p>
      
      <h3>Performance</h3>
      <p>
        Static files are served from the nearest edge location, providing fast load times globally. 
        Pre-built pages eliminate server processing time.
      </p>
      
      <h3>Reliability</h3>
      <p>
        AWS infrastructure provides 99.9% uptime SLA. No servers to crash or maintain.
      </p>
      
      <h3>Developer Experience</h3>
      <p>
        Simple deployment process with Infrastructure as Code. Easy to version control and reproduce environments.
      </p>
      
      <h2>Future Enhancements</h2>
      <ul>
        <li>Custom domain with Route 53 and SSL certificate</li>
        <li>CI/CD pipeline with GitHub Actions</li>
        <li>Content management system integration</li>
        <li>Analytics and monitoring with CloudWatch</li>
        <li>SEO optimization and meta tags</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>
        This serverless blog architecture demonstrates how modern web applications can be built with 
        minimal infrastructure overhead while maintaining high performance, security, and scalability. 
        The combination of Next.js static generation and AWS managed services provides a robust 
        foundation for content delivery at global scale.
      </p>
      
      <div style={{ marginTop: '40px', padding: '20px', background: '#f0f8ff', borderRadius: '5px' }}>
        <h3>Live URLs</h3>
        <p><strong>S3 Website:</strong> <a href="http://jporter-blog-bucket.s3-website-us-east-1.amazonaws.com" target="_blank">http://jporter-blog-bucket.s3-website-us-east-1.amazonaws.com</a></p>
        <p><strong>CloudFront CDN:</strong> <a href="https://d2q85jfmmtyamu.cloudfront.net" target="_blank">https://d2q85jfmmtyamu.cloudfront.net</a></p>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a href="/index.html" style={{ color: '#0070f3', textDecoration: 'none' }}>← Back to Home</a>
      </div>
    </div>
  )
}