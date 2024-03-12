import { IUser } from '@/interfaces/use-interface';
import { Schema, model, models } from 'mongoose';

const userSigneeSchema = new Schema<IUser>({
    signeeWalletAddress: {
        type: Schema.Types.Mixed,
        unique: true,
        trim: true,
    },
}, {
    timestamps: true
});

const UserSignee = models.UserSignee || model('UserSignee', userSigneeSchema);

export default UserSignee;