import { connectToDB } from '@/utils/connectToDB';
import appoint from '@/models/appoint';

export const performDatabaseAction = async () => {
  try {
    await connectToDB();
    const today = new Date().toISOString().split('T')[0];
    const result = await appoint.updateMany(
      { status: "pending", date: today },
      { $set: { status: "accepted" } }
    );
    return result;
  } catch (error) {
    console.error('Error updating the appointments:', error);
    throw error;
  }
};
