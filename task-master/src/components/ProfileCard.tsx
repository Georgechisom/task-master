import React, { FC } from "react";

interface Profile {
  avatar_url?: string;
  full_name?: string;
  bio?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
}

interface ProfileCardProps {
  profile: Profile | null;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="flex items-center space-x-4 p-4 bg-surface-light dark:bg-surface-dark rounded-md shadow-md">
      <img
        src={profile.avatar_url || "/default-avatar.png"}
        alt={profile.full_name || "User Avatar"}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h2 className="text-2xl font-semibold">
          {profile.full_name || "User"}
        </h2>
        {profile.bio && <p className="text-muted-foreground">{profile.bio}</p>}
        <div className="flex space-x-4 mt-2">
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Website
            </a>
          )}
          {profile.twitter && (
            <a
              href={`https://twitter.com/${profile.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Twitter
            </a>
          )}
          {profile.linkedin && (
            <a
              href={`https://linkedin.com/in/${profile.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
