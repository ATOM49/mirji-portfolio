import {
  DocumentData,
  getISOStringFromTimeStamp,
  getTimeStampFromISOString,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "../services/firebase";

export interface IProject {
  id?: string;
  title: string;
  description: string;
  start: string;
  end: string;
}

class Project {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly start: string,
    readonly end: string
  ) {}

  toString(): string {
    return this.title + ", starting " + this.start + ", ending" + this.end;
  }
}

export const postConverter = {
  toFirestore(post: Project): DocumentData {
    return {
      title: post.title,
      description: post.description,
      start: getTimeStampFromISOString(post.start),
      end: getTimeStampFromISOString(post.end),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Project {
    const data = snapshot.data(options)!;
    return new Project(
      data.title,
      data.description,
      getISOStringFromTimeStamp(data.start),
      getISOStringFromTimeStamp(data.end)
    );
  },
};
