import React from 'react';
import { truncateStr } from '../utils/string';

const DEFAULT_AVATAR = 'assets/images/avatar_placeholder.png';
const MAX_SUMMARY_LENGTH = 82;

export const AuthorField = ({ data }) => (
  <>
    {data && !data.error ? (
      <section className="author-field">
        <h3 className="title">ABOUT ME</h3>
        <img
          className="profile-photo"
          data-user={data.userId}
          alt="author-photo"
          width="120"
          height="auto"
          src={data?.userAvatar || DEFAULT_AVATAR}
        />
        <h3 className="author-name">{data.fullName}</h3>
        {data.occupation && <p className="occupation">{data.occupation}</p>}
        <div className="author-description">
          <p>{truncateStr(data.summary, MAX_SUMMARY_LENGTH) + '...'}</p>
          <strong>
            {data.linkedIn && (
              <a target="_blank" title="LinkedIn profile" href={data.linkedIn}>
                Read more
              </a>
            )}
          </strong>
        </div>
      </section>
    ) : (
      <div>Author info not available</div>
    )}
  </>
);
