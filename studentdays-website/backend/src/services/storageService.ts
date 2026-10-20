import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';

// Ensure upload subdirectories exist
const subdirs = ['trips', 'colleges', 'gallery', 'profiles'];
subdirs.forEach(sub => {
  const p = path.join(config.uploadDir, sub);
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
});

// Allowed MIME types
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'trips';
    if (req.baseUrl.includes('colleges')) folder = 'colleges';
    else if (req.baseUrl.includes('gallery')) folder = 'gallery';
    else if (req.baseUrl.includes('profile')) folder = 'profiles';

    cb(null, path.join(config.uploadDir, folder));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    // Safe filename prevents path traversal
    const safeName = `${Date.now()}-${uuidv4()}${ext}`;
    cb(null, safeName);
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype) || !ALLOWED_EXTENSIONS.includes(ext)) {
    return cb(new Error('Invalid file type. Only JPEG, PNG, and WebP image files are allowed.'));
  }
  cb(null, true);
};

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: config.maxFileSizeMb * 1024 * 1024 // e.g. 5MB
  },
  fileFilter
});

export interface IStorageService {
  saveFile(file: Express.Multer.File, category: string): Promise<string>;
  deleteFile(relativeUrl: string): Promise<boolean>;
}

export class LocalStorageService implements IStorageService {
  async saveFile(file: Express.Multer.File, category: string): Promise<string> {
    const filename = path.basename(file.path);
    return `/uploads/${category}/${filename}`;
  }

  async deleteFile(relativeUrl: string): Promise<boolean> {
    try {
      const cleanPath = path.normalize(relativeUrl).replace(/^(\.\.[\/\\])+/, '');
      const filePath = path.join(config.uploadDir, cleanPath.replace(/^\/uploads\//, ''));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}

export const storageService = new LocalStorageService();
