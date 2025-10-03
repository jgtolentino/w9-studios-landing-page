export default function handler(req: any, res: any) {
  res.status(200).json({ commit: process.env.VERCEL_GIT_COMMIT_SHA || 'local' });
}
