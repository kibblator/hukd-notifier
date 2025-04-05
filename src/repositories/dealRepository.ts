import { DealItem } from '../types/dealTypes';
import db from './db'

export class DealRepo {
    private dealsCollection

    constructor() {
        db.loadDatabase({}, () => {
            if (!db.getCollection("deals")) {
                db.addCollection("deals")
            }
            this.dealsCollection = db.getCollection("deals")
        })
    }

    addDeal = (newDeal: DealItem): void => {
        this.dealsCollection.insert(newDeal)
        db.saveDatabase()
    }

    removeDeal = (dealGuid: string): void => {
        this.dealsCollection.findAndRemove({ guid: dealGuid })
        db.saveDatabase()
    }

    deleteDealsOlderThanAMonth = (): void => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);

        const dealsToDelete = this.dealsCollection.where((deal) => {
            return new Date(deal.pubDate) < currentDate
        })

        console.log(`About to delete deals ${dealsToDelete.length}`)

        dealsToDelete.forEach((deal) => {
            this.dealsCollection.remove(deal);
        });
        db.saveDatabase()
    }

    findDealsByGuids = (guids: string[]): DealItem[] => {
        const items = guids.map(guid => {
            return this.dealsCollection.findOne({ guid: guid })
        }).filter(Boolean)
        return items
    }
}