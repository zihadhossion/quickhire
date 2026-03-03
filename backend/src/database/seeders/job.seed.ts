import { DataSource } from 'typeorm';
import { Job } from 'src/modules/jobs/job.entity';
import { JobCategoryEnum, JobTypeEnum, JobStatusEnum } from 'src/shared/enums';

export async function seedJobs(dataSource: DataSource): Promise<void> {
    const jobRepository = dataSource.getRepository(Job);

    const existingJobs = await jobRepository.count();

    if (existingJobs > 0) {
        console.log(`ℹ️  ${existingJobs} job(s) already exist in database`);
        return;
    }

    console.log('Creating sample jobs...');

    const jobs: Partial<Job>[] = [
        {
            title: 'Senior Backend Engineer',
            company: 'Acme Corp',
            location: 'Dhaka, Bangladesh',
            category: JobCategoryEnum.ENGINEERING,
            type: JobTypeEnum.FULL_TIME,
            description:
                'We are looking for a talented Senior Backend Engineer to join our growing team. You will design and build scalable APIs, work with PostgreSQL and Redis, and collaborate with frontend engineers to ship great products. Strong experience with Node.js or NestJS is required.',
            status: JobStatusEnum.ACTIVE,
        },
        {
            title: 'Frontend Developer (React)',
            company: 'TechVision Ltd',
            location: 'Remote',
            category: JobCategoryEnum.ENGINEERING,
            type: JobTypeEnum.REMOTE,
            description:
                'TechVision is hiring a skilled React developer to build responsive, accessible web interfaces. You will work closely with our design and product teams to create seamless user experiences. Proficiency in TypeScript, React hooks, and REST APIs is required.',
            status: JobStatusEnum.ACTIVE,
        },
        {
            title: 'Product Designer (UX/UI)',
            company: 'PixelWave Studios',
            location: 'Chittagong, Bangladesh',
            category: JobCategoryEnum.DESIGN,
            type: JobTypeEnum.FULL_TIME,
            description:
                'We are seeking a creative and detail-oriented Product Designer to craft intuitive user experiences for our SaaS platform. Responsibilities include wireframing, prototyping in Figma, conducting usability tests, and collaborating with engineers to deliver polished features.',
            status: JobStatusEnum.ACTIVE,
        },
        {
            title: 'Digital Marketing Manager',
            company: 'GrowthHive',
            location: 'Dhaka, Bangladesh',
            category: JobCategoryEnum.MARKETING,
            type: JobTypeEnum.FULL_TIME,
            description:
                'GrowthHive is looking for an experienced Digital Marketing Manager to lead our online presence. You will plan and execute SEO, SEM, and social media campaigns, track KPIs, and work with content creators to grow brand awareness and drive conversions.',
            status: JobStatusEnum.ACTIVE,
        },
        {
            title: 'Sales Development Representative',
            company: 'CloudPeak Solutions',
            location: 'Sylhet, Bangladesh',
            category: JobCategoryEnum.SALES,
            type: JobTypeEnum.FULL_TIME,
            description:
                'Join our fast-growing sales team as an SDR. You will prospect and qualify leads via calls, emails, and LinkedIn outreach, book meetings for Account Executives, and consistently achieve monthly quotas. Experience in B2B SaaS sales is a big plus.',
            status: JobStatusEnum.ACTIVE,
        },
        {
            title: 'Data Scientist',
            company: 'InsightAI',
            location: 'Remote',
            category: JobCategoryEnum.DATA_SCIENCE,
            type: JobTypeEnum.CONTRACT,
            description:
                'InsightAI needs a Data Scientist to build and deploy machine learning models that power our recommendation engine. You will analyse large datasets, perform feature engineering, and collaborate with the engineering team to integrate models into production. Proficiency in Python, pandas, and scikit-learn is required.',
            status: JobStatusEnum.ACTIVE,
        },
        {
            title: 'Product Manager',
            company: 'LaunchPad Inc',
            location: 'Dhaka, Bangladesh',
            category: JobCategoryEnum.PRODUCT,
            type: JobTypeEnum.FULL_TIME,
            description:
                'LaunchPad is hiring a Product Manager to own the roadmap for our core product. You will gather and prioritise requirements from customers and stakeholders, write clear user stories, work with engineering to deliver features, and track post-launch metrics to iterate quickly.',
            status: JobStatusEnum.ACTIVE,
        },
        {
            title: 'HR Business Partner',
            company: 'PeopleFirst BD',
            location: 'Dhaka, Bangladesh',
            category: JobCategoryEnum.HR,
            type: JobTypeEnum.FULL_TIME,
            description:
                'PeopleFirst BD is looking for an experienced HR Business Partner to support our growing workforce. You will drive recruitment, onboarding, and employee engagement initiatives while ensuring compliance with local labour laws. Strong interpersonal and communication skills are essential.',
            status: JobStatusEnum.ACTIVE,
        },
        {
            title: 'Customer Success Specialist',
            company: 'SupportBridge',
            location: 'Remote',
            category: JobCategoryEnum.CUSTOMER_SUCCESS,
            type: JobTypeEnum.PART_TIME,
            description:
                'SupportBridge is seeking a Customer Success Specialist to help clients onboard, adopt, and get maximum value from our platform. You will conduct product demos, handle support tickets, and proactively engage at-risk accounts to reduce churn.',
            status: JobStatusEnum.ACTIVE,
        },
        {
            title: 'Junior Full-Stack Developer (Internship)',
            company: 'Nexus Labs',
            location: 'Dhaka, Bangladesh',
            category: JobCategoryEnum.ENGINEERING,
            type: JobTypeEnum.INTERNSHIP,
            description:
                'Nexus Labs offers a 3-month paid internship for junior developers eager to learn full-stack development. You will work on real features alongside senior engineers, participate in code reviews, and gain hands-on experience with React, Node.js, and PostgreSQL.',
            status: JobStatusEnum.DRAFT,
        },
    ];

    for (const jobData of jobs) {
        const job = jobRepository.create(jobData as Job);
        await jobRepository.save(job);
    }

    console.log(`✅ Successfully created ${jobs.length} sample jobs`);
}
