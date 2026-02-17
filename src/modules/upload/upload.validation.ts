import { z } from 'zod';

export const DocumentNameEnum = z.enum([
  'NID',
  'PASSPORT',
  'BIRTH_CERTIFICATE',
  'DRIVING_LICENSE',
  'TIN_CERTIFICATE',
  'STUDENT_ID',
  'MARRIAGE_CERTIFICATE',
]);

export const documentSchema = z.object({
  type: z.enum(['OTHER', 'AVATAR', 'RESUME', 'SIGNATURE', 'CERTIFICATE']), // allowed document types
  name: z.enum(DocumentNameEnum.options), // only required for CERTIFICATE type, optional for others
  documentNo: z
    .string()
    .regex(/^[a-zA-Z0-9-]+$/, 'Document number must be alphanumeric')
    .optional(), // optional
  issueDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid issue date'),
  issueAuthority: z.string().min(2, 'Issue authority is required'),
  remarks: z.string().optional(),
  candidateExperienceId: z.string().uuid().optional(), // optional, must be UUID if provided
  candidateEducationId: z.string().uuid().optional(), // optional, must be UUID if provided
});
