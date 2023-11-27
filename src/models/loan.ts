import {
	prop,
	getModelForClass,
	post,
	ModelOptions,
	Severity,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

/**
 * We use the @post hook to convert the _id field to id of each document returned by the database.
 * This conversion is necessary because we will be sending these documents from the server to the client through Next.js Server Actions and Functions. The requirement is that the data transferred between the server and client should be serializable, and the ObjectId type is not serializable.
 */
@post<LoanClass>('save', function (doc) {
	if (doc) {
		doc.id = doc._id.toString();
		doc._id = doc.id;
	}
})
@post<LoanClass[]>(/^find/, function (docs) {
	// @ts-ignore
	if (this.op === 'find') {
		docs.forEach((doc) => {
			doc.id = doc._id.toString();
			doc._id = doc.id;
		});
	}
})
@ModelOptions({
	schemaOptions: {
		timestamps: true,
		collection: 'loans',
	},
	options: {
		allowMixed: Severity.ALLOW,
	},
})
class LoanClass {
	@prop({ required: true })
	lenderAddress: string;

	@prop({ required: true })
	loanToken: string;

	@prop({ required: true })
	loanAmount: string;

	@prop({ required: true })
	collateralToken: string;

	@prop({ required: true })
	collateralAmount: string;

	@prop({ required: true })
	liquidationThreshold: string;

	@prop({ required: true })
	initialThreshold: string;

	@prop({ required: true })
	loanRepayDeadline: Date;

	@prop({ required: true })
	loanRequestDeadline: Date;

	@prop({ required: true })
	interestRate: string;

	@prop({ required: true })
	managerNFT: string;

	@prop({ default: 'v1' })
	managerNFTVersion: string;

	_id: mongoose.Types.ObjectId | string;

	id: string;
}

const Loan = getModelForClass(LoanClass);
export { Loan, LoanClass };
