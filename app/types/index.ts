export type User = {
    profile: Profile;
    experiences?: Experience[];
    education?: Education[];
    skills?: Skill[];
    lisecensesAndCertifivations?: LicenseAndCertification[];
    courses?: Course[];
    languages?: Language[];
    projects?: Project[];
    featuredCards?: FeaturedCard[]; 
}

export type Profile = {
    id: string;
    firstName: string;
    lastName?: string
    pronoun?: string;
    profileImage?: string;
    backgroundImage?: string;
    headline: string;
    location?: string;
    city?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: string;

}

export type FeaturedCard = {
    title: string;
    description?: string;
    image: string;
    link: string;
}

export type Project = {
    name: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    links?: string[]
}

export type Language = {
    name: string;
    level: string;
}

export type Course = {
    title: string;
    description?: string;
}

export type LicenseAndCertification = {
    title: string;
    vendor: string;
    description?: string;
}

export type Skill = {
    name: string;
    description?: string;
    endorsement: number;
}

export type Education = {
    institution: string;
    degree: string;
    start: Date;
    end: Date;
}

export type Experience = {
    company: string;
    location: string;
    positions: {
        title: string
        startDate: Date;
        endDate?: Date
        description?: string;
    }[]
}