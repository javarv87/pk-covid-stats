export class TimelineEvent {
    date: Date;
    cases: number;
    deaths: number;
    recovered: number;
}

export class Timeline {
    country: string;
    timeline: TimelineEvent[];
};